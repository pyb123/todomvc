(function(window) {
	"use strict";

	let list = JSON.parse(localStorage.getItem('todoList')) || []
	const vm = new Vue({
		el: ".todoapp",
		data: {
			list,
			todoName: '',
			clickId: -1
		},
		methods: {
			addTodo(){
				// 添加到list中
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					isCompleted: false
				})
				// 清空input框
				this.todoName = ''
			},
			delTodo(id){
				// console.log(id);
				const idx = this.list.filter(v => v.id == id)
				this.list.splice(idx,1)
			},
			showEdit(id){
				this.clickId = id
			},
			updateTodo(){
				this.clickId = -1
			},
			clearTodo(){
				this.list = this.list.filter(v => !v.isCompleted)
			}
		},
		computed: {
			leftCount(){
				return this.list.filter(v => !v.isCompleted).length
			},
			isClearShow(){
				return this.list.some(v => v.isCompleted)
			}
		},
		watch: {
			list: {
				handler(value){
					localStorage.setItem('todoList',JSON.stringify(value))
				},
				deep: true
			}
		}
	});
})(window);
