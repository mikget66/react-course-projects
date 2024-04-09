# Worldwise README

This project focuses on creating contexts, routes, and using maps. It utilizes React and React Router to implement the desired functionality. Below are the key components and their functionalities:

## `Components`
- CitiesProvider: Manages the state related to cities and provides data and functions to its children components through the CitiesContext.Provider.

- useCities: Custom hook that provides access to the cities context.

- Map: Renders a map using the react-leaflet library and displays markers for each city. Handles geolocation and navigation to the Form component.

- ChangeCenter: Sets the map's view to a specified position.

- App: Root component of the application, provides the cities context and handles routing

## `App`

- Root component.
- Wraps the app with `CitiesProvider`.
- Uses `react-router-dom` for routing.
- Renders different components based on routes.

## `CitiesProvider`

- Manages state for cities.
- Provides data and functions via `CitiesContext.Provider`.

## `useCities`

- Custom hook for accessing cities context.
- Returns context object with data and functions.

## `Map`

- Renders map using `react-leaflet`.
- Displays city markers.
- Handles map events and navigation.

## `ChangeCenter`

- Sets map's view to specified position.

These are the key features of each component.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Start the development server using `npm start`.
