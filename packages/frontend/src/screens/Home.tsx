import { Button, ButtonGroup } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../rtk/hooks';
import { decrement, increment } from '../rtk/counter-slice';
import { signUpCommand } from '../rtk/auth-slice';

export default function Home() {
  const count = useAppSelector((state) => state.counterState.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup>
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
      </ButtonGroup>
    </>
  );
}
