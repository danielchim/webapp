import React from 'react';

// Individual components for each block type
const HeadingBlock = ({ text }) => (
  <h2 className="text-2xl font-bold mt-4 mb-2">{text}</h2>
);

const ParagraphBlock = ({ text }) => <p className="mb-4">{text}</p>;

// Map block type to its corresponding component
const blockComponentMap = {
  header: HeadingBlock,
  paragraph: ParagraphBlock,
  // Add more block types as needed
};

export const BlockRenderer = ({ isClamped, blocks }) => {
  return (
    <div className={!isClamped?"line-clamp-2":"line-clamp-none"}>
      {blocks.blocks.map((block, index) => {
        const Component = blockComponentMap[block.type];
        if (Component) {
          return <Component key={index} {...block.data} />;
        }
        return null; // handle other block types as needed
      })}
    </div>
  );
};
