/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgIcon from './SvgIcon/SvgIconIndex.vue'
import Pagination from './Pagination/index_pagination.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGloablComponent: any = { SvgIcon,Pagination };

export default {
    install(app: any) {
        Object.keys(allGloablComponent).forEach(key => {
            app.component(key, allGloablComponent[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}