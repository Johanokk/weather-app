import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    if (!city || city.trim() === "") {
      setResult("Please enter a city name");
      return;
    }

    try {
      const data = await fetchWeather(city);

      let condition = "Normal weather";
      if (data.main.temp < 0) condition = "Very cold";
      else if (data.main.temp > 25) condition = "Hot weather";
      else if (data.wind.speed > 10) condition = "Very windy";

      setResult(
        `City: ${data.name}\nTemperature: ${data.main.temp} °C\nWeather: ${data.weather[0].description}\nWind: ${data.wind.speed} m/s\nCondition: ${condition}`
      );
    } catch (err: any) {
      console.error(err);
      setResult(`Could not fetch weather: ${err?.message ?? String(err)}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ padding: 20, flex: 1, justifyContent: "flex-start" }}>
          <TextInput
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
            style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <Button title="Get weather" onPress={handleSearch} />
          <Text style={{ marginTop: 20 }}>{result}</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
