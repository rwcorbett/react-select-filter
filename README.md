# react-search-filter

React Search Filter

## Purpose

This demonstrates a React app that parses

## App

All app components are in `App.tsx` for simplicity of keeping the data in scope, however, ideally the data is handled differently and the individual components are separated into files and loaded more efficiently to prevent the monolithic render when state changes.

The app is using TypeScript but proper interfaces and types have not been defined (yet!)

## Data

The `data.js` object is based on JSON from [dummyJSON](https://dummyjson.com/) and contains a list of recipes. This data is sorted by cuisine category and the names of each are listed below.

Live data could be used, simply fetch `https://dummyjson.com/recipes?limit=20` and process the response JSON when the promise returns.

## Search

The search box is janky, the state of the component as it changes triggers a render which is not ideal. A timeout has been added to the filter query function to allow a slight delay while user types - this needs to be refactored to not trigger until all user input is complete.

## UI

The styles are written using SCSS syntax and then Vite is preprocessing this into CSS. The items are arranged using flexbox but the app is not fully responsive (yet!). Basic responsive font sizes have been added, long text is truncated using ellipsis.

Clicking the item simply shows the full name and recipe ID, but this could be iterated upon to add a selected state or build a new list.