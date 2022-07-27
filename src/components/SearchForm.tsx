import React, { useState } from 'react';
import { DateRange, Range } from 'react-date-range';
import format from 'date-fns/format';
import { IoBed, IoPersonSharp } from 'react-icons/io5';
import { BiCalendar } from 'react-icons/bi';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PersonsCount from './PersonsCount';

const SearchForm = () => {
  // CALENDAR
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // PERSONS
  const [openCount, setOpenCount] = useState<boolean>(false);
  const [roomOptions, setRoomOptions] = useState({
    adults: 2,
    children: 0,
    room: 1,
  });

  // FORM
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className=" bg-brandBlue flex justify-center pt-60 md:pt-20 relative">
      <div className="max-w-6xl absolute -translate-y-48 w-full md:-translate-y-1/2">
        <form onSubmit={handleSubmit} className="mx-2">
          <div className="w-full p-1 shadow-md bg-brandYellow rounded-sm grid md:grid-rows-1 md:grid-cols-4 md:gap-x-1 gap-y-1 md:gap-y-0">
            {/* INPUT 1 - LOCATION */}
            <div className="flex items-center">
              <input
                type="text"
                name=""
                id="destination"
                placeholder="Where are you going?"
                className="w-full h-full p-3.5 pl-11 placeholder:text-black placeholder:text-sm placeholder:font-semibold rounded-sm focus:outline-none focus:placeholder:text-gray-400 hover:outline-2
              hover:outline
            hover:outline-brandYellowDark
            "
              />
              <IoBed className="absolute ml-2 h-5 w-5 text-gray-300" />
            </div>

            {/* INPUT 2 - DATES */}
            <div className="flex items-center bg-white px-3.5 p-3.5 space-x-3.5 relative">
              <BiCalendar className="h-6 w-6 text-gray-300" />
              <span
                onClick={() => {
                  setOpenCount(false);
                  setOpenCalendar(!openCalendar);
                }}
                className="w-full cursor-pointer text-sm font-semibold"
              >
                {format(date[0].startDate as Date, 'iii, MMM dd')}
                {' · '}
                {format(date[0].endDate as Date, 'iii, MMM dd')}
              </span>

              {/* calendar */}
              {openCalendar ? (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="absolute -left-3.5 top-16 shadow-xl"
                />
              ) : null}
            </div>

            {/* INPUT 3 - ROOM OPTIONS */}
            <div className="flex items-center bg-white px-3.5 p-3.5 space-x-3.5 relative">
              <IoPersonSharp className="h-6 w-6 text-gray-300" />
              <span
                className="w-full cursor-pointer text-sm font-semibold"
                onClick={() => {
                  setOpenCalendar(false);
                  setOpenCount(!openCount);
                }}
              >
                {roomOptions.adults > 1
                  ? `${roomOptions.adults} adults`
                  : `${roomOptions.adults} adult`}{' '}
                · {roomOptions.children} children ·{' '}
                {roomOptions.room > 1
                  ? `${roomOptions.room} rooms`
                  : `${roomOptions.room} room`}{' '}
              </span>
              {/* room options */}
              {openCount ? (
                <PersonsCount
                  roomOptions={roomOptions}
                  setRoomOptions={setRoomOptions}
                  styleClasses="absolute -left-3.5 top-16 shadow-xl"
                />
              ) : null}
            </div>
            {/* end */}
            <button
              type="submit"
              className="py-3 text-xl font-semibold bg-brandBlueSec100 text-white hover:bg-brandBlueSec200"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchForm;
