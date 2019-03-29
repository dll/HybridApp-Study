/**
 * 自定义的枚举类
 */
export class Enum {
	get obj() {
		return this._obj;
	}

	set obj(value) {
		this._obj = value;
	}

	/**
	 * 枚举常量数组
	 * @type {Array<Enum>}
	 */
	_constants = [];

	/**
	 * 枚举常量的索引码
	 * @type {int}
	 */
	_code;

	/**
	 * 枚举常量的值
	 * @type {string}
	 */
	_val;

	/**
	 * 枚举常量的文本
	 * @type {string}
	 */
	_text;

	get constants() {
		return this._constants;
	}

	get code() {
		return this._code;
	}

	get val() {
		return this._val;
	}

	get text() {
		if(this._val !== this._text) {
			return this._text;
		}
		return Enum.toString(this._val);
	}


	/**
	 * 构造函数，传入一个普通对象作为参数，可以是默认属性值
	 * @param obj {Object}
	 */
	constructor(obj) {
		let index = 0;
		for(let entry of Object.entries(obj)) {
			const code = index;
			const key = entry.keys()[0];
			const value = entry.values()[0];
			const constant = new Enum(code, key, value);
			//通过MyEnum.State1的形式得到枚举值
			this[key] = constant;
			//通过MyEnum.constants的形式得到所有的枚举值
			this._constants.push(constant);
			index++;
		}
	}

	/**
	 * 构造函数，传入枚举值的索引码、值和文本作为参数
	 * @param code {int}
	 * @param val {string}
	 * @param text {string}
	 */
	constructor(code, val, text) {
		this._code = code;
		this._val = val;
		this._text = text;
	}

	/**
	 * 将枚举值转化为处理后的文本。
	 *
	 * <p>对默认方式的说明：
	 * <br>如果要以数字开头："__1Str" -> "1Str"；
	 * <br>如果要包含空格："Str__Str" -> "Str Str"；
	 * <br>如果要包含路径分隔符："StrSPStr" ->
	 *
	 * @returns {string} 处理后的文本。
	 */
	static toString(origin) {
		let result = "";
		if(origin.startsWith("__")) {
			result = origin.substring(2);
		} else if(origin.includes("__")) {
			result = origin.replace("__", " ");
		} else if(origin.includes("SP")) {
			result = origin.replace("SP", "/");
		}
		return result;
	}
}