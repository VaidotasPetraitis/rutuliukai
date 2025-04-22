export function random_int_in_range(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

export function random_f_in_range(min, max){
    return Math.random() * (max - min) + min;
}

export function random_binary(n){
    return Math.random() <= n ? 1 : 0;
}