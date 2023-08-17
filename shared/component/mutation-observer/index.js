import { useEffect, useRef } from 'react';

function MutationObserverDemo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const targetNode = containerRef.current;

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        console.log(mutation.type, mutation.target);
        if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    });

    // 配置观察选项
    const config = {
      childList: true, // 观察子节点的添加和删除
      attributes: true, // 观察属性的变化
      subtree: true, // 观察所有后代节点的变化
    };

    // 开始观察目标节点
    observer.observe(targetNode, config);

    // 在组件卸载时停止观察
    return () => observer.disconnect();
  }, []);

  const addElement = () => {
    const div = document.createElement('div');
    div.textContent = 'New Child';
    containerRef.current.appendChild(div);
  };

  const changeAttribute = () => {
    containerRef.current.setAttribute('data-modified', 'true');
  };

  const addSubtree = () => {
    const div = document.createElement('div');
    div.innerHTML = '<span>Subtree Child</span>';
    containerRef.current.appendChild(div);
  };

  return (
    <div>
      <button onClick={addElement}>Add Element</button>
      <button onClick={changeAttribute}>Change Attribute</button>
      <button onClick={addSubtree}>Add Subtree</button>
      <div
        ref={containerRef}
        id="container"
        style={{
          border: '1px solid black',
          minHeight: '50px',
          maxWidth: '300px',
        }}
      >
        Container
      </div>
    </div>
  );
}

export default MutationObserverDemo;
