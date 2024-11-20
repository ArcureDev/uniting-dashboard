import ky from "ky";

export const httpClient = ky.create();

export function buildHttpRequest(url: string) {
    return `http://localhost:5173/api${url}`;
}

export function toHttpParams<T extends { [key in string]: any }>(params: T, defaultValues?: Partial<T>): URLSearchParams {
    let formattedParams: URLSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        let enhanceValue = value ?? defaultValues?.[key];
        if (enhanceValue !== null && enhanceValue !== undefined) {
            if (Array.isArray(enhanceValue)) {
                enhanceValue = enhanceValue.filter(value => value !== null && value !== undefined);
                formattedParams = enhanceValue.reduce((acc: any, item: any) => acc.append(key, item), formattedParams);
            } else {
                formattedParams.set(key, enhanceValue);
            }
        }
    });
    return formattedParams;
}