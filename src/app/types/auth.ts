

export interface SucessAuth<T = any> {
    message?: string
    sucess: boolean;
    error?: string;
    payload?: T
}
