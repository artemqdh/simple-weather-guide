export interface Weather {
    temperatureCelsius: number;
    realFeel: number;
    cityName: string;
    sunrise : number;
    sunset : number;
    weatherConditions: string;
    icon: string;
}

export interface HourlyForecast {
    time: number; // Hour in 24h format
    temperatureCelsius: number;
    forecast: string;
    realFeelCelsius: number;
    windSpeed: number;
    icon: string;
}