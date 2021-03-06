A unified JavaScript layer for Callback projects.

# Structure

build/
    Will contain any build modules (currently nothing here as it is all 
    hacked into the JakeFile)

lib/

    bootstrap.js
        code to bootstrap the phonegap platform, inject APIs and fire events

    builder.js
        injects in our classes onto navigator (or wherever else is needed)

    exec/
        will contain the platform specific definitaions of the exec method.
        thinking of maybe renaming/repurposing this for any other platform
        specific quirks

    platform/
        definitions of each platform (a-la Ripple) that help us describe where
        and what to put on the window object

    plugin/
        all API definitions as plugins

# Building

Just make sure you have node, npm and jake installed and run:

    jake

It will build into the pkg folder.

# Testing

Figure this out... mobile-spec?

# Integration

## Callback

Build the .js file and drop it in as a replacement for phonegap.js!

## Ripple

Load this in Ripple to play with it. You will have to use the phonegap
prototype branch to better simulate the phone environment and use this
javascript rather than Ripples emulated code.

    git clone git@github.com:blackberry-webworks/Ripple-UI.git
    git checkout winnie.the.pooh
    ./configure
    jake

and then load the upacked extension in chrome in the pkg/chromium folder.
Use the phonegap.proto platform in ripple.

# TODO / Hacking / Contributing

- figure out the unit tests
- figure out the bootstrap
- think more about what it means to run in node
- think about whether to select and load the platform specific modules at
  runtime or at buildtime.
- modularize phonegap.js, thoughts/examples/potentials:
  - PhoneGap.exec, PhoneGap.callbackSuccess, Realistically we should have a phonegap/bridge module that would house these
    methods and such.
- 3rd party plugins could be interesting. Need a little bit more thought about how these will fit into the system. I am thinking a package.json type file to handle per plugin.
