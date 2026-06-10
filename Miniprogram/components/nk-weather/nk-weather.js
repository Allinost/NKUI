Component({
  properties: {
    city: { type: String, value: '' },
    temperature: { type: String, value: '' },
    weather: { type: String, value: '' },
    icon: { type: String, value: '' },
    humidity: { type: Number, value: null },
    wind: { type: String, value: '' },
    unit: { type: String, value: 'C' },
    size: { type: String, value: 'md' },
    loading: { type: Boolean, value: false },
  },
})
