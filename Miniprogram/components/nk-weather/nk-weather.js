Component({
  properties: {
    city: { type: String, value: '' },
    temperature: { type: String, value: '' },
    weather: { type: String, value: '' },
    icon: { type: String, value: '' },
    humidity: { type: Number, value: null },
    wind: { type: String, value: '' },
    pressure: { type: Number, value: null },
    tempHigh: { type: String, value: '' },
    tempLow: { type: String, value: '' },
    unit: { type: String, value: 'C' },
    size: { type: String, value: 'md' },
    loading: { type: Boolean, value: false },
  },
  data: {
    weatherCondition: 'default',
    weatherLabel: '',
    builtinIconDataUri: '',
    timeText: '',
  },
  observers: {
    'weather': function () { this.updateWeather() },
  },
  lifetimes: {
    attached() {
      this.updateWeather()
      this.updateTime()
    },
  },
  methods: {
    updateWeather() {
      const w = (this.data.weather || '').toLowerCase()
      let condition = 'default'
      if (w.includes('晴') || w.includes('sun') || w.includes('clear')) condition = 'sunny'
      else if (w.includes('多云') || w.includes('cloud') || w.includes('overcast')) condition = 'cloudy'
      else if (w.includes('阴')) condition = 'overcast'
      else if (w.includes('雨') || w.includes('rain') || w.includes('shower') || w.includes('drizzle')) condition = 'rainy'
      else if (w.includes('雪') || w.includes('snow')) condition = 'snowy'
      else if (w.includes('雾') || w.includes('fog') || w.includes('mist')) condition = 'foggy'
      else if (w.includes('风') || w.includes('wind')) condition = 'windy'
      else if (w.includes('霾') || w.includes('haze')) condition = 'hazy'

      const labelMap = {
        sunny: '晴', cloudy: '多云', overcast: '阴',
        rainy: '雨', snowy: '雪', foggy: '雾',
        windy: '风', hazy: '霾',
      }
      const svgMap = {
        sunny: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="12" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/><line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/><line x1="12.7" y1="12.7" x2="16.4" y2="16.4"/><line x1="47.6" y1="47.6" x2="51.3" y2="51.3"/><line x1="12.7" y1="51.3" x2="16.4" y2="47.6"/><line x1="47.6" y1="16.4" x2="51.3" y2="12.7"/></g></svg>',
        cloudy: '<svg viewBox="0 0 64 64" fill="none"><circle cx="26" cy="28" r="10" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="2" stroke-linecap="round"><line x1="26" y1="12" x2="26" y2="16"/><line x1="26" y1="40" x2="26" y2="44"/><line x1="10" y1="28" x2="14" y2="28"/><line x1="38" y1="28" x2="42" y2="28"/></g><path d="M18 44c-6 0-10-4-10-9s4-9 10-9h2a10 10 0 0 1 19 0h1c5 0 9 4 9 9s-4 9-9 9z" fill="#B0BEC5" opacity="0.9"/></svg>',
        overcast: '<svg viewBox="0 0 64 64"><path d="M14 46c-8 0-13-5-13-12s5-12 13-12h2a13 13 0 0 1 24 0h2c7 0 12 5 12 12s-5 12-12 12z" fill="#90A4AE"/><rect x="16" y="38" width="32" height="4" rx="2" fill="#78909C"/></svg>',
        rainy: '<svg viewBox="0 0 64 64"><path d="M16 38c-7 0-12-5-12-11s5-11 12-11h2a12 12 0 0 1 22 0h1c6 0 11 5 11 11s-5 11-11 11z" fill="#90A4AE"/><g stroke="#42A5F5" stroke-width="2" stroke-linecap="round"><line x1="18" y1="44" x2="14" y2="54"/><line x1="28" y1="44" x2="24" y2="54"/><line x1="38" y1="44" x2="34" y2="54"/><line x1="48" y1="44" x2="44" y2="54"/></g></svg>',
        snowy: '<svg viewBox="0 0 64 64"><path d="M16 38c-7 0-12-5-12-11s5-11 12-11h2a12 12 0 0 1 22 0h1c6 0 11 5 11 11s-5 11-11 11z" fill="#90A4AE"/><circle cx="16" cy="50" r="2.5" fill="#E3F2FD"/><circle cx="28" cy="55" r="2.5" fill="#E3F2FD"/><circle cx="40" cy="50" r="2.5" fill="#E3F2FD"/><circle cx="22" cy="46" r="2" fill="#E3F2FD"/><circle cx="34" cy="46" r="2" fill="#E3F2FD"/></svg>',
        foggy: '<svg viewBox="0 0 64 64"><g fill="#B0BEC5"><rect x="8" y="22" width="48" height="4" rx="2"/><rect x="14" y="32" width="36" height="4" rx="2"/><rect x="10" y="42" width="44" height="4" rx="2"/></g></svg>',
        windy: '<svg viewBox="0 0 64 64"><g stroke="#90A4AE" stroke-width="3" stroke-linecap="round"><line x1="8" y1="22" x2="48" y2="22"/><line x1="14" y1="32" x2="52" y2="32"/><line x1="10" y1="42" x2="44" y2="42"/></g></svg>',
        hazy: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="8" fill="#FFB74D" opacity="0.6"/><g fill="#B0BEC5" opacity="0.5"><rect x="8" y="20" width="48" height="3" rx="1.5"/><rect x="12" y="28" width="40" height="3" rx="1.5"/><rect x="10" y="36" width="44" height="3" rx="1.5"/><rect x="16" y="44" width="32" height="3" rx="1.5"/></g></svg>',
        default: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#FFD93D"/><g stroke="#FFD93D" stroke-width="3" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/></g></svg>',
      }

      const svg = svgMap[condition] || svgMap.default
      this.setData({
        weatherCondition: condition,
        weatherLabel: labelMap[condition] || '',
        builtinIconDataUri: 'data:image/svg+xml,' + encodeURIComponent(svg),
      })
    },
    updateTime() {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      this.setData({ timeText: h + ':00' })
    },
  },
})
