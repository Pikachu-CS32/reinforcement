/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../utils';

const columnNames = ['Pending', 'In Progress', 'Completed'];
const columns = [];
for (let i = 0; i < columnNames.length; i++) {
  const column = {};
  const props = {
    orientation: 'vertical',
    className: 'card-container',
  };

  column.id = `column${i}`;
  column.type = 'container';
  column.name = `${columnNames[i]}`;
  column.props = props;
  column.children = [];
  columns.push(column);
}

class Board extends Component {
  constructor() {
    super();

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: 'container',
        props: {
          orientation: 'horizontal',
        },
        children: columns,
      },
    };
  }

  componentDidMount() {
    fetch('/api/1')
      .then((cards) => cards.json())
      .then((cards) => {
        for (let i = 0; i < cards.length; i++) {
          const child = {};
          child.type = 'draggable';
          child.id = cards[i].id;
          child.props = { className: 'card' };
          child.data = cards[i].body;
          columns[cards[i].status].children.push(child);
        }
        this.setState(state => {
          return { scene: { children: columns }}
        });
      });
  }

  render() {
    return (
      <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
          {this.state.scene.children.map((column) => {
            return (
              <Draggable key={column.id}>
                <div className={column.props.className}>
                  <div className="card-column-header">
                    {column.name}
                  </div>
                  <Container
                    {...column.props}
                    groupName="col"
                    onDragStart={(e) => console.log('drag started', e)}
                    onDragEnd={(e) => console.log('drag end', e)}
                    onDrop={(e) => this.onCardDrop(column.id, e)}
                    getChildPayload={(index) => this.getCardPayload(column.id, index)}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                      console.log('drag enter:', column.id);
                    }}
                    onDragLeave={() => {
                      console.log('drag leave:', column.id);
                    }}
                    onDropReady={(p) => console.log('Drop ready: ', p)}
                    dropPlaceholder={{
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.children.map((card) => {
                      return (
                        <Draggable key={card.id}>
                          <div {...card.props}>
                            <p>{card.data}</p>
                          </div>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter((p) => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop(dropResult) {
    const scene = { ...this.state.scene };
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene,
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = { ...this.state.scene };
      const column = scene.children.filter((p) => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = { ...column };
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene,
      });
    }
  }
}

export default Board;
