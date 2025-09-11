import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import * as VuetifyComponents from 'vuetify/lib/labs/components.mjs';

export default createVuetify({
	components: {
		...components,
		...VuetifyComponents,
	},
	directives,
	icons: {
		defaultSet: 'mdi',
	},
	theme: {
		defaultTheme: 'light',
		themes: {
			light: {
				dark: false,
				colors: {
					primary: '#ccdff0',
					secondary: '#f2f7fd',
					accent: '#FF8100',
					error: '#dc3545',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FF9800',
					
					myGreen: '#00FF00',
					blue: '#1976d2',
					link: '#636363',
					header: '#ccdff0',
					btn: '#F0F1F3',
					orange: '#ff8100',
					blueText: '#125991',

					'my-grey': '#D2D4D7',
				},
			},
			// dark: {
			// 	dark: true,
			// 	colors: {
			// 		primary: '#6a0edc',
			// 		secondary: '#F47B42',
			// 		accent: '#FFCA28',
			// 		error: '#EF5350',
			// 		info: '#29B6F6',
			// 		success: '#66BB6A',
			// 		warning: '#FFA726',
			// 	},
			// 	variables: {
			// 		'theme-primary50': '107, 14, 221, 0.50',
			// 		'theme-primary80': '107, 14, 221, 0.80',
			// 		'theme-error75': '203, 36, 36, 0.75',
			// 		'theme-on-surface': '255, 255, 255, 0.52',
			// 	},
			// },
		},
	},
});