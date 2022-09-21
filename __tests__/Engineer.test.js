const Engineer = require ("../lib/Engineer");

test("get role gets the role", () => {
    let e = new Engineer()
    expect(e.getRole()).toBe("Engineer")
})