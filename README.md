<img src="https://raw.githubusercontent.com/Raathigesh/Jest-tools/main/icons/Github%20banner.png">

Jest tools let you inspect html from your Jest tests with ease when logging to console is not enough.

### Getting started

-   Install the [VSCode extension.](https://marketplace.visualstudio.com/items?itemName=Raathigeshan.jest-tools)
-   From VSCode's command palette, run the `Jest tools: Start jest tools` command.
-   This will show you the Jest tools UI. **The initial screen will ask you to start Jest with additional command line arguments (A custom jest reporter to capture console logs).**
-   Then simply `console.log()` a html string and it will appear in the inspector.

#### An example usage

Logging the entire body content after rendering a component.

```javascript
import { render } from '@testing-library/react';

test('should work', () => {
    render(<App />);
    console.log(document.body.innerHtml); // this html will appear in jest tools
});
```

### Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Raathigesh"><img src="https://avatars.githubusercontent.com/u/3108160?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Raathi Kugarajan</b></sub></a><br /><a href="https://github.com/Raathigesh/Jest tools/commits?author=Raathigesh" title="Code">💻</a> <a href="https://github.com/Raathigesh/Jest tools/commits?author=Raathigesh" title="Documentation">📖</a> <a href="#ideas-Raathigesh" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Raathigesh" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Raathigesh" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
