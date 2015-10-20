(function(p) {
    'use strict';

// Setup paper.js by providing a canvas element
    p.setup( document.getElementById('canvas') );

    var font = new p.Font({
            familyName: 'Demo',
            ascender: 800,
            descender: -200
        }),

    // glyphs
        A = new p.Glyph({
            name: 'A',
            unicode: 'A',
            advanceWidth: 512
        }),
        B = new p.Glyph({
            name: 'B',
            unicode: 'B',
            advanceWidth: 512
        }),
        C = new p.Glyph({
            name: 'C',
            unicode: 'C',
            advanceWidth: 512
        }),
        a = new p.Glyph({
            name: 'a',
            unicode: 'a',
            advanceWidth: 496
        }),
        i = new p.Glyph({
            name: 'i',
            unicode: 'i',
            advanceWidth: 268
        }),
        o = new p.Glyph({
            name: 'o',
            unicode: 'o',
            advanceWidth: 536
        }),
        shape,
        counter;

// A contours
    shape = new p.Path.RegularPolygon({
        center: [256, 136],
        sides: 3,
        radius: 256
    });
    counter = new p.Path.RegularPolygon({
        center: [256, 61],
        sides: 3,
        radius: 256
    });
    shape.rotate(180, [256, 136]);
    counter.rotate(180, [256, 61]);
    A.addContour(shape.subtract(counter));
    A.scale(1,2, [256, 0]);

// B contours
    shape = new p.Path.Rectangle({
        point: [0, 0],
        size: [450, 450]
    });
    counter = new p.Path.Rectangle({
        point: [40, 40],
        size: [370, 370]
    });
    B.addContour(shape.subtract(counter));
    shape = new p.Path.Rectangle({
        point: [0, 410],
        size: [340, 340]
    });
    counter = new p.Path.Rectangle({
        point: [40, 450],
        size: [260, 260]
    });
    B.addContour(shape.subtract(counter));

// C contours
    shape = new p.Path.Ellipse({
        point: [0, 0],
        size: [520, 800]
    });
    counter = new p.Path.Ellipse({
        point: [40, 40],
        size: [440, 720]
    });
    shape = shape.subtract(counter);
    counter = new p.Path.Rectangle({
        point: [430, 180],
        size: [100, 440]
    });
    C.addContour(shape.subtract(counter));

    // a contour
    shape = new p.Path.RegularPolygon({
        center: [268, 124],
        sides: 3,
        radius: 248
    });
    shape.rotate(180, [268, 124]);
    shape.scale(1, 1.4, [268, 0]);
    a.addContour(shape);

// i contour
    shape = new p.Path.Rectangle({
        point: [60, 0],
        size: [140, 500]
    });
    i.addContour(shape);

// o contour
    shape = new p.Path.Ellipse({
        point: [50, 0],
        size: [436, 510]
    });
    o.addContour(shape);

    font.addGlyphs([ A, B, C, a, i, o ]);
    font.updateOTCommands()
        .addToFonts();

})(plumin.paper);
				