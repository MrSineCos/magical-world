import React from "react";

import Reveal from "./Reveal";

const SangTao = () => {
  return (
    <section id="sangtao">
      <Reveal>
        <h2 className="section-title">Creations</h2>
        <p>Khám phá những dự án và sáng tạo độc đáo của tôi:</p>
        <ul>
          <li>Hệ thống điều khiển nhà thông minh điều khiển bằng chatbot</li>
          <li>Chatbot nhái giọng nói</li>
          <li>Điều khiển laptop bằng cử chỉ qua camera</li>
          <li>Và nhiều dự án thú vị khác...</li>
        </ul>
      </Reveal>
    </section>
  );
};

export default SangTao;
