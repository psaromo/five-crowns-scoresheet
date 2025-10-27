import { useCallback, useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { TbPlayCard } from 'react-icons/tb';
import { Modal } from './Modal';
import {
  GiCardJackClubs,
  GiCardQueenClubs,
  GiCardKingClubs,
  GiCardJoker,
  GiCardPickup,
  GiCardRandom,
} from 'react-icons/gi';

const RulesAndInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = useCallback(() => setModalIsOpen(false), []);

  return (
    <div>
      <div className="flex justify-start items-center space-x-2">
        <MdInfoOutline />
        <a href="https://cdn.1j1ju.com/medias/b3/19/ed-five-crowns-rulebook.pdf" target="_blank">
          Rulebook (PDF)
        </a>
      </div>
      <div className="flex justify-start items-center space-x-2">
        <TbPlayCard /> <button onClick={() => setModalIsOpen(true)}>Card Values</button>
      </div>
      <Modal
        {...{
          modalIsOpen,
          setModalIsOpen,
          closeModal,
          title: 'Card Values',
          content: (
            <div className="text-yellow-300">
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <GiCardRandom className="text-3xl shrink-0" />
                  <span>Each number card is worth its face value.</span>
                </li>
                <li className="flex items-center gap-3">
                  <GiCardJackClubs className="text-3xl shrink-0" />
                  <span>
                    <strong>Jacks</strong> are <strong>11</strong> points.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GiCardQueenClubs className="text-3xl shrink-0" />
                  <span>
                    <strong>Queens</strong> are <strong>12</strong> points.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GiCardKingClubs className="text-3xl shrink-0" />
                  <span>
                    <strong>Kings</strong> are <strong>13</strong> points.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GiCardJoker className="text-3xl shrink-0" />
                  <span>
                    <strong>Jokers</strong> are <strong>50</strong> points.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GiCardPickup className="text-3xl shrink-0" />
                  <span>
                    The current <strong>wild cards</strong> are <strong>20</strong> points.
                  </span>
                </li>
              </ul>
            </div>
          ),
          confirmButtonText: 'Got it, thanks!',
        }}
      />
    </div>
  );
};

export default RulesAndInfo;
