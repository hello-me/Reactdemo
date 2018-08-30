/**
 * Created by licong on 2018/8/30.
 */
 export const type = {
  SWITCH_MENU : 'SWITCH_MENU'
 }
// 声明菜单点击切换函数，修改面包屑名称
export function switchMenu(menuName) {
return {
    type: type.SWITCH_MENU,
    menuName
}
console.log(menuName)
}