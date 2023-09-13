import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/index.css'

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// Icons to be imported
import { faBuildingColumns, faListCheck, faPeopleGroup, faPersonHarassing, faRightFromBracket, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faTrophy, faRightFromBracket, faPeopleGroup ,faBuildingColumns,faPersonHarassing,faListCheck);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount('#app')
