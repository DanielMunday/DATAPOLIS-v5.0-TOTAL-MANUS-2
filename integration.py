import requests

class HedonicIntegration:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.some-real-estate-data-provider.com/v1"

    def get_external_data(self, property_id):
        try:
            response = requests.get(
                f"{self.base_url}/properties/{property_id}/hedonic",
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            response.raise_for_status()  # Raise an exception for bad status codes
            return {"hedonic_data": response.json()}
        except requests.exceptions.RequestException as e:
            print(f"Error fetching hedonic data: {e}")
            return {"hedonic_data": {}, "error": str(e)}
