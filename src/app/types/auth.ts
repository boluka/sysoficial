

export interface SucessAuth<T = any> {
    sucess: boolean;
    error?: string;
    payload?: T
}
