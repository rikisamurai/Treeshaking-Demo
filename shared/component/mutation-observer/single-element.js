import { useEffect, useRef, useState } from 'react';

export function MutationSingleElement() {
  const [show, setShow] = useState(false);
  const showRef = useRef(null);

  useEffect(() => {
    const targetNode = showRef.current;

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        console.log(mutation.type, mutation.target);
        if (mutation.type === 'attributes') {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
          if (
            mutation.target.attributes.getNamedItem('data-perf-id').value ===
            'update'
          ) {
            console.info('rendered');
          }
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

  return (
    <div>
      <button onClick={() => setShow(true)}>Show Me!</button>
      <div id={'showup'} ref={showRef} data-perf-id={show ? 'update' : 'mount'}>
        show show show
      </div>
    </div>
  );
}
