/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 * 
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2010-2011, IBM Corporation
 */

/**
 * This represents the PhoneGap API itself, and provides a global namespace for accessing
 * information about the state of PhoneGap.
 */
var PhoneGap = {
    /**
     * Method to fire event from native code
     */
    fireEvent: function(type) {
        var e = document.createEvent('Events');
        e.initEvent(type, false, false);
        document.dispatchEvent(e);
    },

    /**
     * Plugin callback mechanism.
     */
    callbackId: 0,
    callbacks:  {},
    callbackStatus: {
        NO_RESULT: 0,
        OK: 1,
        CLASS_NOT_FOUND_EXCEPTION: 2,
        ILLEGAL_ACCESS_EXCEPTION: 3,
        INSTANTIATION_EXCEPTION: 4,
        MALFORMED_URL_EXCEPTION: 5,
        IO_EXCEPTION: 6,
        INVALID_ACTION: 7,
        JSON_EXCEPTION: 8,
        ERROR: 9
    },

    /**
     * Called by native code when returning successful result from an action.
     *
     * @param callbackId
     * @param args
     */
    callbackSuccess: function(callbackId, args) {
        if (PhoneGap.callbacks[callbackId]) {

            // If result is to be sent to callback
            if (args.status == PhoneGap.callbackStatus.OK) {
                try {
                    if (PhoneGap.callbacks[callbackId].success) {
                        PhoneGap.callbacks[callbackId].success(args.message);
                    }
                }
                catch (e) {
                    console.log("Error in success callback: "+callbackId+" = "+e);
                }
            }

            // Clear callback if not expecting any more results
            if (!args.keepCallback) {
                delete PhoneGap.callbacks[callbackId];
            }
        }
    },

    /**
     * Called by native code when returning error result from an action.
     *
     * @param callbackId
     * @param args
     */
    callbackError: function(callbackId, args) {
        if (PhoneGap.callbacks[callbackId]) {
            try {
                if (PhoneGap.callbacks[callbackId].fail) {
                    PhoneGap.callbacks[callbackId].fail(args.message);
                }
            }
            catch (e) {
                console.log("Error in error callback: "+callbackId+" = "+e);
            }

            // Clear callback if not expecting any more results
            if (!args.keepCallback) {
                delete PhoneGap.callbacks[callbackId];
            }
        }
    },
};
    
module.exports = PhoneGap;
