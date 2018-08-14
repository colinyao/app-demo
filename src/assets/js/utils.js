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
    },
    getStyle: (ele, opts) => {
        let styles = {}
        let styleColection = window.getComputedStyle(ele);
        if (typeof opts === 'object') {
            opts.forEach((key) => {
                styles[key] = styleColection[key] ? +styleColection[key].replace('px', '') : ''
            })
            return styles;
        } else {
            return styleColection[opts] ? +styleColection[opts].replace('px', '') : ''
        }
    },
    offset: (curEle) => {
        var totalLeft = null,
            totalTop = null,
            par = curEle.offsetParent;
        //首先加自己本身的左偏移和上偏移
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop
        //只要没有找到body，我们就把父级参照物的transition-group边框和偏移也进行累加
        while (par) {
            //累加父级参照物本身的偏移
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop
            par = par.offsetParent;
        }

        return {
            left: totalLeft,
            top: totalTop
        }
    }
}

export default utils
