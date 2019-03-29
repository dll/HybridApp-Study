//WARN 当使用import语句时，会因无法识别而报错
//WARN 当在类中声明非方法的字段时，会因无法识别而报错
//WARN 当出现含有“不是一个构造函数”的错误时，将代码中你的箭头函数尽可能地转化成匿名参数

/**邀请状态*/
const InviteState = {
	Invite: "邀请中",
	Refuse: "已拒绝",
	Accept: "已接收",
	All: "所有状态"
};

/**添加状态*/
const AddState = {
	Success: "成功",
	ValidationError: "验证错误",
	Duplicate: "重复"
};

/**受邀嘉宾对象*/
class Guest {
	constructor(name = '', phone = '') {
		this.name = name;
		this.phone = phone;
		this.inviteState = InviteState.All;
	}

	/**接受邀请。*/
	accept() {
		this.inviteState = InviteState.Accept;
	}

	/**拒绝邀请。*/
	refuse() {
		this.inviteState = InviteState.Refuse;
	}
}

/**受邀嘉宾的服务*/
class GuestService {
	constructor() {
		this.list = [];
	}

	/**
	 * 添加受邀嘉宾。
	 * @param guest {Guest} 受邀嘉宾。
	 */
	add(guest) {
		//如果用户对象为空、为其他类型，则抛出异常
		if(guest === null || !guest instanceof Guest)
			throw new TypeError();

		//如果用户的姓名或手机号不正确（只验证非空）
		if(guest.name.trim() === "" || guest.phone.trim() === "") {
			return {addState: AddState.ValidationError, guest: null}
		}
		//如果存在手机号重复的用户
		let tempList = this.list.filter(e => e.phone === guest.phone);
		if(tempList.length > 0) {
			return {addState: AddState.Duplicate, guest: null}
		}
		//添加数据
		this.list.push(guest);
		return {addState: AddState.Success, guest: guest}
	}

	/**
	 * 移除受邀嘉宾。
	 * @param guest {Guest} 受邀嘉宾。
	 */
	remove(guest) {
		this.list = this.list.filter(e => e.phone !== guest.phone);
	}

	/**
	 * 根据邀请状态查询受邀嘉宾。
	 * @param inviteState 邀请状态。
	 * @returns {Array<Guest>}
	 */
	findByState(inviteState) {
		if(inviteState === InviteState.All) {
			return this.list;
		}
		return this.list.filter(e => inviteState = e.inviteState);
	}
}

/**受邀嘉宾的控制器*/
class GuestController {
	constructor($scope, $location, guestService) {
		let inviteState = InviteState.All;

		$scope.InviteState = InviteState;
		$scope.AddState = AddState;
		$scope.newGuest = new Guest();
		$scope.guestList = [];

		//单击邀请按钮，邀请当前嘉宾
		$scope.invite = (newGuest) => {
			//WARN 必须从参数对应的对象创建一个新的对象，否则会强制双向绑定
			//WARN 不能使用Object.assign方法。
			let guest = new Guest(newGuest.name, newGuest.phone);
			let msg = guestService.add(guest);

			switch(msg.addState) {
				case AddState.Success:
					$scope.guestList = guestService.findByState(inviteState);
					break;
				case AddState.ValidationError:
					alert('请输入正确的姓名和电话');
					break;
				case AddState.Duplicate:
					alert('嘉宾信息有重复，请检查');
					break;
			}
		};

		$scope.accept = (guest) => {
			guest.accept();
		};

		$scope.refuse = (guest) => {
			guest.refuse();
		};

		//单击删除按钮，删除对应的嘉宾
		$scope.remove = (guest) => {
			guestService.remove(guest);
			$scope.guestList = guestService.findByState(inviteState);
		};

		//监听$location，完成路由功能，进行列表的筛选
		$scope.$watch('$location.path()', (newValue) => {
			switch(newValue) {
				case '/all':
					inviteState = InviteState.All;
					break;
				case '/invite':
					inviteState = InviteState.Invite;
					break;
				case '/accept':
					inviteState = InviteState.Accept;
					break;
				case '/refuse':
					inviteState = InviteState.Refuse;
					break;
			}
			//把数据从模型层移动到视图模型层
			$scope.guestList = guestService.findByState(inviteState);
		});
	}
}


//得到AngularJS模块
let app = angular.module('guestListApp', []);
//WARN AngularJS在依赖注入时对该回调方法使用new关键字来实例化依赖对象，因此：
//WARN 此处使用箭头函数会报错，直接使用new GuestService()也会报错，如果不返回也会报错
//WARN 因此，使用AngularJS时，不应该使用JS类
app.service("guestService", function() {
	return new GuestService();
});
app.controller('guestController', function($scope, $location, guestService) {
	return new GuestController($scope, $location, guestService);
});

