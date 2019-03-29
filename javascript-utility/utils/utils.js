//JavaScript的常用拓展

/*自定义Proxy的方法*/

//可以通过function [Symbol("_invariant")](..){...}的形式，确保此方法是私有的

/**
 * 得到目标的代理对象，私有化以下划线开头的属性（包括方法）。
 * @param target 目标对象。
 * @returns {Proxy} 目标对象的代理对象。
 */
function doPrivate(target) {
	function invariant(key, action) {
		if(key[0] === '_') {
			throw new Error(`Invalid attempt to ${action} private "${key}" property`);
		}
	}

	let handler = {
		get(target, key) {
			invariant(key, 'get');
			return target[key];
		},
		set(target, key, value) {
			invariant(key, 'set');
			target[key] = value;
			return true;
		}
	};
	return new Proxy(target, handler);
}

/**
 * 得到目标的代理对象，在获取方法的时候自动绑定this。
 * @param target 目标对象。
 * @returns {Proxy} 目标对象的代理对象。
 */
function doSelfish(target) {
	const cache = new WeakMap();
	const handler = {
		get(target, key) {
			const value = Reflect.get(target, key);
			if(typeof value !== 'function') {
				return value;
			}
			if(!cache.has(value)) {
				cache.set(value, value.bind(target));
			}
			return cache.get(value);
		}
	};
	return new Proxy(target, handler);
}


/*自定义生成器*/

/**
 * 指定整数范围的生成器。
 * @param min {Number} 最小值。默认为0。
 * @param max {Number} 最大值。默认为10。自动转化为不小于最小值的值。
 * @param step {Number} 迭代间隔。默认为1。自动转化为正整数。
 * @returns {IterableIterator<*>}
 */
function* range(min = 0, max = 10, step = 1) {
	max = Math.max(min, max);
	step = Math.max(1, step);
	let index = min;
	while(index <= max) {
		yield index;
		index += step;
	}
}

/*自定义Promise的方法*/

/**
 * 指定在回调链的尾端调用的回调函数，并保证抛出任何可能出现的错误。
 * @param onFulfilled {function} 当Promise对象实现时调用的回调函数。
 * @param onRejected {function} 当Promise对象拒绝时调用的回调函数。
 */
Promise.prototype.done = function(onFulfilled, onRejected) {
	this.then(onFulfilled, onRejected)
	.catch(function(reason) {
		setTimeout(() => throw reason, 0);
	});
};

/**
 * 指定不管最后的状态如何，都会调用的回调函数。
 * @param callback 调用的回调函数。
 */
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => throw reason)
	);
};

/*自定义Object方法*/

Object.prototype.clone = function() {
	let newObj = {};
	for(let entry of Object.entries(this)) {
		newObj[entry[0]] = entry[1];
	}
	return newObj;
};
