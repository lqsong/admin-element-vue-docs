# 数据请求 {#index}

## 前端请求流程 {#process}

在项目中，一个完整的前端 UI 交互到服务端处理流程是这样的：

- 1、UI 组件交互操作；
- 2、调用 `server.ts` api 请求函数；
- 3、使用封装的 `/src/utils/request.ts` 发送请求；
- 4、获取服务端返回；
- 5、更新 data；


##  request.ts {#fun}

`/src/utils/request.ts` 是基于 [Axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。它封装了全局 `request拦截器`、`response拦截器`、`消除器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置`等。详细内容如下：

```ts
/**
 * @description: 自定义 request 网络请求工具,基于axios
 * @author LiQingSong
 */
import qs from "qs";
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";
import { ContentTypeEnum, ResultCodeEnum } from "@/enums/utils.request.enum";
import { ajaxHeadersTokenKey, ajaxResponseNoVerifyUrl } from "@/config/settings";
import { getToken } from "@/utils/localToken";
import { isFunction } from "@/utils/is";
import router from "@/config/router";
import { IResponseData, ICodeMessage, IAxiosRequestConfig } from "@/@types/utils.request";

/* ================ 自定义请求消除器 相关 S ======================= */
/**
 * @description: 声明一个 Map 用于存储每个请求的标识 和 取消函数
 */
let requestPendingMap = new Map<string, Canceler>();

/**
 * @description: 序列化配置参数，生成唯一请求标识url
 * @param config 请求配置参数
 * @returns string
 */
export const getRequestPendingUrl = (config: IAxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

/**
 * @description: 自定义请求消除器类
 */
export class RequestCanceler {
	/**
	 * @description: 添加请求
	 * @param config 请求配置参数
	 * @returns void
	 */
	addPending(config: IAxiosRequestConfig) {
		// 在请求开始前，对之前的请求做检查取消操作
		this.removePending(config);
		const url = getRequestPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken((cancel) => {
				if (!requestPendingMap.has(url)) {
					// 如果 pending 中不存在当前请求，则添加进去
					requestPendingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description: 移除请求
	 * @param config 请求配置参数
	 * @returns void
	 */
	removePending(config: IAxiosRequestConfig) {
		const url = getRequestPendingUrl(config);
		if (requestPendingMap.has(url)) {
			// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
			const cancel = requestPendingMap.get(url);
			cancel && cancel();
			requestPendingMap.delete(url);
		}
	}

	/**
	 * @description: 清空所有pending
	 * @returns void
	 */
	removeAllPending() {
		requestPendingMap.forEach((cancel) => {
			cancel && isFunction(cancel) && cancel();
		});
		requestPendingMap.clear();
	}

	/**
	 * @description: 重置
	 * @returns void
	 */
	reset(): void {
		requestPendingMap = new Map<string, Canceler>();
	}
}

/**
 * @description: 生成请求消除器
 */
export const requestCanceler = new RequestCanceler();

/* ================ 自定义请求类 相关 S ======================= */
/**
 * @description: 自定义状态码对应内容信息
 */
const customCodeMessage: ICodeMessage = {
	[ResultCodeEnum.LOGININVALID]: "当前用户登入信息已失效，请重新登入再操作", // 未登陆,自己可以调整状态码
};

/**
 * @description: 定义服务端状态码对应内容信息
 */
const serverCodeMessage: ICodeMessage = {
	200: "服务器成功返回请求的数据",
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	500: "服务器发生错误，请检查服务器(Internal Server Error)",
	502: "网关错误(Bad Gateway)",
	503: "服务不可用，服务器暂时过载或维护(Service Unavailable)",
	504: "网关超时(Gateway Timeout)",
};

/**
 * @description: 异常处理程序
 * @returns Promise
 */
const errorHandler = (error: any) => {
	const { response, message } = error;
	if (message === "CustomError") {
		// 自定义错误
		const { config, data } = response;
		const { url, baseURL } = config;
		const { code, msg } = data;
		const reqUrl = url.split("?")[0].replace(baseURL, "");
		const noVerifyBool = ajaxResponseNoVerifyUrl.includes(reqUrl);
		if (!noVerifyBool) {
			alert(customCodeMessage[code] || msg || "Error");

			if (code === ResultCodeEnum.LOGININVALID) {
				// 如果未登录或失效，这里可以跳转到登录页面
				router.push("/user/login");
			}
		}
	} else if (response && response.status) {
		const errorText = serverCodeMessage[response.status] || response.statusText;
		const { status, request } = response;
		alert(`请求错误 ${status}: ${request.responseURL}\n${errorText}`);
	} else if (!response) {
		alert("网络异常：您的网络发生异常，无法连接服务器");
	}

	return Promise.reject(error);
};

/**
 * @description: 自定义请求类
 */
export class Request {
	ajax: AxiosInstance;
	public constructor(config: IAxiosRequestConfig) {
		const { contentType, ...otherCofing } = config || {};
		// 实例化axios，配置请求时的默认参数
		this.ajax = axios.create({
			...otherCofing,
			headers: {
				...otherCofing.headers,
				"Content-Type": contentType || ContentTypeEnum.JSON,
			},
		});

		/**
		 * @description: 请求前, 请求拦截器
		 */
		this.ajax.interceptors.request.use(
			(axiosConfig: AxiosRequestConfig) => {
				// 将当前请求添加到请求消除器 pending 中
				requestCanceler.addPending(config);

				if (!axiosConfig.headers) {
					axiosConfig.headers = {};
				}
				// 自定义添加token header
				const headerToken = getToken();
				if (headerToken) {
					axiosConfig.headers[ajaxHeadersTokenKey] = headerToken;
				}

				return axiosConfig;
			},
			/* ,error=> {} */ // 已在 export default catch
		);

		/**
		 * @description: 请求后, 响应拦截器
		 */
		this.ajax.interceptors.response.use(
			(response: AxiosResponse<IResponseData>) => {
				// 在请求结束后，移除本次请求
				requestCanceler.removePending(config);

				const res = response.data;
				const { code } = res;

				// 自定义状态码验证
				if (code !== ResultCodeEnum.SUCCESS) {
					return Promise.reject({
						response,
						message: "CustomError",
					});
				}

				return response;
			},
			/* , error => {} */ // 已在 export default catch
		);
	}

	/**
	 * @description: 请求方法
	 * @param config 请求参数
	 * @returns AxiosPromise
	 */
	all<T = any, R = AxiosResponse<T>>(config: IAxiosRequestConfig): AxiosPromise<R> {
		const { contentType, ...otherCofing } = config || {};
		return this.ajax({
			...otherCofing,
			headers: {
				...otherCofing.headers,
				"Content-Type": contentType || ContentTypeEnum.JSON,
			},
		})
			.then((response: AxiosResponse) => response.data)
			.catch((error: any) => errorHandler(error));
	}
}

/**
 * @description: 生成统一公共请求
 */
const ask = new Request({
	baseURL: import.meta.env.VITE_APP_API_URL || "", // url = api url + request url
	withCredentials: false, // 当跨域请求时发送cookie
	timeout: 0, // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

/**
 * @description: 导出 ajax 方法
 * @param config IAxiosRequestConfig 请求参数
 * @returns AxiosPromise
 */
export default function ajax<T = any>(config: IAxiosRequestConfig): AxiosPromise<AxiosResponse<T>> {
	return ask.all<T>(config);
}
```

> 数据请求的详细样列可以查看 `登录页面`。基于此封装，如果二次开发，安装了第三方UI组件，可以把对应的弹框提示做优化。
