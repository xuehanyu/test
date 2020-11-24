/**
 * 1512. 好数对的数目
 * 给你一个整数数组 nums,如果一组数字 (i,j) 满足 nums[i] == nums[j] 且 i < j ，就可以认为这是一组 好数对 。返回好数对的数目。
 */

 /**
  * 输入：nums = [1,2,3,1,1,3]
  * 输出：4
  * 解释：有 4 组好数对，分别是 (0,3), (0,4), (3,4), (2,5) ，下标从 0 开始
  */
 var numIdenticalPairs = function(nums) {
    // 1）双重循环，时间复杂度O(n^2)
    // let count=0    
    // for(let i=0; i<nums.length; i++){
    //     for(let j=i+1; j<nums.length; j++){
    //         if(nums[i]==nums[j]) count++
    //     }
    // }
    // return count
    let map = {};
    let pairs = 0;
    for(let i = 0; i < nums.length; i++) {
        let key = String(nums[i]);
        map[key] = map[key] === undefined ? 0 : map[key] + 1;
        pairs += map[key];
    }

    return pairs;

};
// console.log(numIdenticalPairs([1,2,3,1,1,3]))


/**
 * 1431.拥有最多糖果的孩子
 * 给你一个数组 candies 和一个整数 extraCandies ，其中 candies[i] 代表第 i 个孩子拥有的糖果数目。
 * 对每一个孩子，检查是否存在一种方案，将额外的 extraCandies 个糖果分配给孩子们之后，此孩子有 最多 的糖果。注意，允许有多个孩子同时拥有 最多 的糖果数目。
 */
/*
    输入：candies = [2,3,5,1,3], extraCandies = 3
    输出：[true,true,true,false,true] 
    解释：
    孩子 1 有 2 个糖果，如果他得到所有额外的糖果（3个），那么他总共有 5 个糖果，他将成为拥有最多糖果的孩子。
    孩子 2 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。
    孩子 3 有 5 个糖果，他已经是拥有最多糖果的孩子。
    孩子 4 有 1 个糖果，即使他得到所有额外的糖果，他也只有 4 个糖果，无法成为拥有糖果最多的孩子。
    孩子 5 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。
*/

var kidsWithCandies = function(candies, extraCandies) {
    const maxNum = Math.max(...candies)
    // let arr = []
    // for(let i=0; i<candies.length; i++){
    //     candies[i] + extraCandies >= maxNum ?  arr.push(true) : arr.push(false)
    // }
    // return arr
    return candies.map(item => item + extraCandies >=maxNum)
};
// console.log(kidsWithCandies([2,3,5,1,3], 3))


/**
 * 1389. 按既定顺序创建目标数组
 * 目标数组 target 最初为空。
 * 按从左到右的顺序依次读取 nums[i] 和 index[i]，在 target 数组中的下标 index[i] 处插入值 nums[i] 。
 * 重复上一步，直到在 nums 和 index 中都没有要读取的元素。。
 */
/*
    输入：nums = [0,1,2,3,4], index = [0,1,2,2,1]
    输出：[0,4,1,3,2]
    解释：
    nums       index     target
    0            0        [0]
    1            1        [0,1]
    2            2        [0,1,2]
    3            2        [0,1,3,2]
    4            1        [0,4,1,3,2]
*/

var createTargetArray = function(nums, index) {
    let target = []
    index.map((item, i)=>{
        target.splice(index[i], 0, nums[i])  
    })
    return target
};
// console.log(createTargetArray([0,1,2,3,4], [0,1,2,2,1]))

/**
 * 1313. 解压缩编码列表
 * 给你一个以行程长度编码压缩的整数列表 nums 。
 * 考虑每对相邻的两个元素 [freq, val] = [nums[2*i], nums[2*i+1]] （其中 i >= 0 ），每一对都表示解压后子列表中有 freq 个值为 val 的元素，你需要从左到右连接所有子列表以生成解压后的列表。
 * 请你返回解压后的列表。。
 */
/*
    输入：nums = [1,2,3,4]
    输出：[2,4,4,4]
    解释：第一对 [1,2] 代表着 2 的出现频次为 1，所以生成数组 [2]。
    第二对 [3,4] 代表着 4 的出现频次为 3，所以生成数组 [4,4,4]。
    最后将它们串联到一起 [2] + [4,4,4] = [2,4,4,4]。
*/

var decompressRLElist = function(nums) {
    // 1) 双重循环
    // let arr = []
    // let len = nums.length /2
    // for(let i=0; i<len; i++){
    //     let ret = []
    //     const [freq, val] = [nums[2*i], nums[2*i+1]]
    //     for(let j=0; j<freq; j++){
    //         ret.push(val)
    //     }
    //     arr = arr.concat(ret)
    // }
    // return arr
    // 2）一层循环，利用fill去填充
    let arr = []
    for(let i=0; i<nums.length/2; i++){
        const [freq, val] = [nums[2*i], nums[2*i+1]]
        arr.push(...Array(freq).fill(val))
    }
    return arr
};
// console.log(decompressRLElist([1,2,3,4]))