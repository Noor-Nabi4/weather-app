import { useState, useEffect } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

interface PositionError {
  code: number;
  message: string;
}

const useLocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    // Optionally, you can watch the user's position
    // const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    // Cleanup function to clear the watch if used
    // return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error };
};

export default useLocation;
