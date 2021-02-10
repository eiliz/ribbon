# Ribbon

[Live demo on netlify](https://ribbon-funda.netlify.app)

![ribbon](./ribbon.png?raw=true)

## Features

Ribbon uses funda's API to retrive lists of properties as well as individual properties.

On larger screens it shows a grid of images at the top as well as a link to show
all media items available. On small screens it shows a carousel of images
instead.

On larger screens if you click on an image from the grid it will open a carousel
in a modal. If the property has a video available, its poster iamge will be
shown in the grid and clicking on it will open the video in a modal.

Clicking the Show all media button opens a modal that shows a grid of all media
items including a video if available.

There's also a Google Map of the property's location displayed at the bottom.

The home of the app will show the latest properties coming in from the API based
on a harcoded search although the API service I created in the project does
support sending filters and the specific page to retrieve.

The app is also fully responsive and resizes smoothly for smaller screens.

I've also implemented lazy loading for the images where needed and used the
srcset and sizes attributes to load the right size.

What's not currently implemented is for example preloading images in the
carousel when the user clicks the next button so that the images are there when
the carousel gets to that point.

Throughout I've tried to use dynamic imports to make Webpack split the bundles
into smaller pieces and also to only load them when they're needed.

## Deployment

Because the API doesn't support CORS I've setup Netlify as a proxy to be able to
make the API calls work. The settings are in the netlify.toml file.

## HTTP client

The HTTP client is abstracted so that the currently used library (axios) can be
swapped for another one without making edits across the repo.

It's also configured to throttle the API requests based on a duration set in the env files, with different values for production and
development.

What this means is that the library creates an internal cache where it stores
responses based on the request URL and the specific throttling duration setting.
If the actions of the user will generate requests to URL's that already exist in
the cache, and the throttling duration has not expired yet, the library will
intercept the request and repond with the cached response instead of reaching
across the network.

After the throttling duration has expired, hitting the same URL will result in
actual calls across the network.

## API

Everything related to the API has its own folder and includes API states, the
HTTP client, the supported methods. The API is also injected globally via a
plugin so that if you wanted to make API calls from the components themselves
you could access the right methods like this:

```js
this.$listingsApi.searchListings(this.filters, this.page)
```

### Handling API states for an improved UX

- IDLE - Starting point
- PENDING - An action is being performed
- SUCCESS - An action finished successfully
- ERROR - An action finished with an error


## Base and wrapper components

I've created a base components folder that could hold general components used
across the project, in this case it only has a button and a spinner
(@/components/base). The base components are globally registered using Webpack's
API (helpers/registerBaseComponents.js) so that you don't need to import them in
every place they're used.

This is optional as it does have the disadvantage of these components being
loaded all the time even if not used.

Because I've used a 3rd party carousel, I've wrapped it in a generic component
(@/components/GlideCarousel.vue) so that it can be easily reused without having
to care about what package is used inside. This allows the specific packages to
be later changed for something else without having to make changes in all of the
places they're used in.

For the Google Maps library I've created a helper that manages loading the
script. Right now the map is implemented in the ListingMap.vue component so the
specific implementation details are present there. A further step would be to create a generic map component as well
that encapsulates the map functionality so that the actual map provider could be
swapped without having to make updates in all the places the map is used - the
users of the map should not be aware of what is used underneath.

## Assets

I'm using Tailwind as the CSS framework and I've configured it to purge unused
CSS so that only what's actually used in the app gets deployed.

The CSS is also split into a tailwind file that holds all Tailwind imports, a
typography file, a file for transitions, a file that updates the look of the
custom select component and a main.css file that's the entry point for all
global css.

Because I've used Tailwind there was no need for scoped CSS in the components
themselves.

The assets folder also has an SVG folder and Webpack is configured to load SVG's
so that you can import them as components in your file (import Play from
"@/assets/svg/play.svg").

## Layouts and pages

I'm using a layouts folder to group possible layouts, in this case there's only
one the Main.vue. Then in the router I can use these layout components to hold
the specific pages like Home.

## Vuex

Even though this project is not using a store I've scaffolded the basic
structure to show the best practices I'd normally use like setting
constant types for mutations which helps to take advantage of tools like linters and avoid accidental
typos. Also, a file with constant types can serve as a quick guide on what kind
of getters, actions, and mutations a Vuex module deals with.

Generally I'd use a store for state that is trully global like the
user's name in an app that would appear in multiple places, runtime app config etc.

Otherwise lifting up state in the component tree can be the better pattern. Another
solution would be using a stateful service with Vue observable or upgrading to
Vue3 which thanks to its setup function makes the usage of Vuex much less
needed.


### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
