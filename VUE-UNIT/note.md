## 自动化测试

- 测试是比较浪费时间

- 模块化开发，你更改了某些代码却导致了其他模块受到了影响。快速定位哪的 bug
- 每个人的代码风格不一样。不方便阅读代码中的功能，
- 通过编写测试用例，快速知道别人写的代码是干什么的
- 测试用例会强迫你写出易于被测试的代码，有效的提升代码质量

## 测试是分类的

- 黑盒测试（功能测试，验证代码是否符合预期） 白盒测试（必须知道代码是如何实现的）

- 测试的分类
  单元测试（测试一个函数、一个模块、一个组件）
  集成测试（由多个单元测试组成起来，模拟用户的行为测试）
  端到端测试（puppeteer）

TDD（测试驱动开发） && BDD（行为驱动开发）

- tdd 先测试在开发（白盒测试）
- 先开发在测试（黑盒测试）

常见的测试框架

- Karma 可以把代码放到浏览器中测试，可以帮我们测试 ui
- mocha 只提供一个环境，断言库、 chai 、 sinon 自行去安装
- Jest facebook 出的，很全面，不用启用一个浏览器，用 jsdom 来模拟浏览器环境（不能测试渲染出来的结果） 0 配置 覆盖率
