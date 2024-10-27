import { Button, ButtonGroup } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { decrement, increment } from '../state/counter.slice';
import { signUpCommand } from '../state/auth.slice';

export default function Home() {
  const count = useAppSelector((state) => state.counterState.value);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* <button
        type="button"
        className=":ring-cyan-700 group relative flex items-stretch justify-center rounded-none border border-l-0 border-gray-200 bg-white p-0.5 pl-0 text-center font-medium text-gray-900 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:text-cyan-700 focus:outline-none focus:ring-2 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white">
        <span className="flex items-stretch rounded-none px-4 py-2 text-sm transition-all duration-200">
          Down
        </span>
      </button> */}
      <h1>{count}</h1>
      <Button.Group>
        <Button color="gray" onClick={() => dispatch(increment())}>
          Up
        </Button>
        <Button color="gray" onClick={() => dispatch(decrement())}>
          Down
        </Button>
        <Button
          color="gray"
          onClick={() =>
            dispatch(
              signUpCommand({
                name: 'Jeff Bongo',
                email: 'jb@foo.com',
                password: 'xxxxxx',
              }),
            )
          }>
          Sign up
        </Button>
      </Button.Group>
    </>
  );
}
