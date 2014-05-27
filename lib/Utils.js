
//
// Has method
// Will provide a response for a chain of Object properties
// e.g: x.has('one.of.these.properties');
Object.defineProperty(Object.prototype, '_has', {
    enumerable : false,
    value : function(params) {
        var tester;
        if ('function' !== typeof params && 'string' === typeof params) {
            try {
                eval('tester = this.' + params);
                // This eval is not evil , as long is completely secured
                if (undefined === tester) {
                    throw new Error('The property ' + params + ' is not available');
                }
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
});

//
// getValueOf
// Retrieves the value of a chained Object properties
//
Object.defineProperty(Object.prototype, '_get', {
    enumerable : false,
    value : function(params, fallback) {
        var value;
        if ('function' !== typeof params && 'string' === typeof params) {

            try {
                eval('value = this.' + params.toString());
                if (undefined === value) {
                    throw new Error('not available');
                }
            } catch (e) {
                if (undefined !== fallback) {
                    return fallback;
                }
                return undefined;
            }
        } else {
            return false;
        }
        return value;
    }
});

GLOBAL.stringify = function (obj, circularProperties) {
    var stringified,
        circularProperties = circularProperties ? circularProperties : [];

    function removeCircular(name, value) {
        if (-1 === circularProperties.indexOf(name)) {
            return value;
        } else {
            //Undefined properties will be removed from JSON.
            return undefined;
        }
    }

    try {
        if (0 === circularProperties.length) {
            stringified = JSON.stringify(obj, null, 4);
        } else {
            stringified = JSON.stringify(obj, removeCircular, 4);
        }
    } catch (e) {
        console.error('Stringify error:', e);
        stringified = String(obj);
    }

    return stringified;
}

GLOBAL.isNumber = function (value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    if (typeof value == 'number') {
        return true;
    }
    return !isNaN(value - 0);
}

/**
 * Convert camelCase strings to hyphen separated words.
 *
 * @param  {string} name The camelCase words.
 * @return {string}      The hyphen separated words
 */
GLOBAL.convertFromCamelCase = function (camelCaseWords) {
    return camelCaseWords.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

GLOBAL.generateFontFace = function (font, fontName) {
    var fontFace = '',
        location = '../fonts/';


    Object.keys(font).forEach(function (variant) {
        fontFace += "@font-face {"
            + "font-family: '" + font[variant] + "'; "
            + " src: url('" + location + fontName + "-" + variant + ".eot'); "
            + " src: url('" + location + fontName + "-" + variant + ".eot?#iefix') format('embedded-opentype'),"
            + "     url('" + location + fontName + "-" + variant + ".woff') format('woff'),"
            + "    url('" + location + fontName + "-" + variant + ".ttf') format('truetype'),"
            + "    url('" + location + fontName + "-" + variant + ".svg#" + fontName + variant + "') format('svg');"
            + "font-weight: normal;"
            + "font-style: normal;"
            + "}";
    });

    return fontFace;
}

GLOBAL.getCSSFontFamily = function (fontName) {
    var font = "";

    if (undefined !== fonts[fontName]) {
        font += generateFontFace(fonts[fontName].family, fonts[fontName].name);
    } else {
        // The font does not exist in the font collection.
    }

    return font;
}

GLOBAL.fonts = {
        Oswald: {
            family: {
                regular: 'oswaldbook'
            },
            name: 'oswald'
        },
        IcoMoon: {
            family: {
                regular: 'icomoon'
            },
            name: 'icomoon'
        },
        MavenProBold: {
            family: {
                regular: 'maven_probold'
            },
            name: 'maven_pro_bold'
        },
        MavenProBlack: {
            family: {
                regular: 'maven_problack'
            },
            name: 'maven_pro_black'
        },
        MavenProMedium: {
            family: {
                regular: 'maven_promedium'
            },
            name: 'maven_pro_medium'
        },
        MavenProRegular: {
            family: {
                regular: 'maven_proregular'
            },
            name: 'maven_pro_regular'
        },
        MavenPro: {
            family: {
                bold: 'maven_probold',
                regular: 'maven_pro',
                medium: 'maven_promedium'
            },
            name: 'maven_pro'
        },
        OpenSans: {
            family: {
                bold: 'open_sansbold',
                blackitalic: 'open_sansbold_italic',
                extrabold: 'open_sansextrabold',
                extrabolditalic: 'open_sansextrabold_italic',
                italic: 'open_sansitalic',
                light: 'open_sanslight',
                lightitalic: 'open_sanslight_italic',
                semibold: 'open_sanssemibold',
                regular: 'open_sans',
                semibolditalic: 'open_sanssemibold_italic',
            },
            name: 'open_sans'
        },
        Roboto: {
            family: {
                black: 'robotoblack',
                blackitalic: 'robotoblack_italic',
                bold: 'robotobold',
                bolditalic: 'robotobold_italic',
                italic: 'robotoitalic',
                light: 'robotolight',
                medium: 'robotomedium',
                mediumitalic: 'robotomedium_italic',
                regular: 'robotoregular',
                thin: 'robotothin',
                thinitalic: 'robotothin_italic'
            },
            name: 'roboto'
        }
    };