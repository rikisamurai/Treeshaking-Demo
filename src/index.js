import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.createElement('div');
rootElement.id = 'root';

// 将容器元素添加到 body 中
document.body.appendChild(rootElement);

// 渲染组件到容器中
ReactDOM.render(<App />, rootElement);
