// 匹配 分成三类

// 相等 不想等 是否包含

it('相等用例',()=>{
    expect(1+1).toBe(2) // ===
    expect({name:'jack'}).toEqual({name:'jack'})  // 判断长得一不一样
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()
})


it('buxiangdeng',()=>{
    expect(1+1).not.toBe(3) // ===
    expect(1+1).toBeLessThan(3)
    expect(1+1).toBeGreaterThan(1)
})

it('panduanshifoubaohan',()=>{
   expect('hello').toContain('h')
   expect('hello').toMatch(/h/)
})



// 写dom元素，