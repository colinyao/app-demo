let defaultFn = () => {}

const utils = {
        debounce: (fn, delay) => {
            let _fn = typeof fn === 'function' ? fn : defaultFn,
                _delay = delay || 200,
                timer = ';'
            return function () {
                // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
                let context = this;
                let args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }
}

export default utils
