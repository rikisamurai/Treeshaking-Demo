import { createRoot } from 'react-dom/client';
import App from './App';
import { camelCase } from 'lodash';

const rootElement = document.createElement('div');
rootElement.id = 'root';

// 将容器元素添加到 body 中
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
// 渲染组件到容器中
root.render(<App />);

console.info(camelCase('camel-case'));
