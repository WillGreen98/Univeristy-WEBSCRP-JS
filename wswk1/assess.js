QUnit.module( "Week One - Basics" );

QUnit.test("OK1",
    function(assert) {
        assert.ok(
            true,
            "This test passes - it doesn't actually test anything."
        );
    }
);

QUnit.test("OK2",
    function(assert) {
        assert.ok(
            1==1,
            "This test also passes - it also doesn't actually test anything, but you get the idea of what a passing test looks like."
        );
    }
);


QUnit.test(
    "Write a function `add` that takes two parameters (a and b) and returns the result of adding them,  Assume a and b are both numbers.",
    function(assert) {
        assert.ok(
            add(3, 2) === 5,

        );
    }
);
