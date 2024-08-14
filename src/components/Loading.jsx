import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';


export function Loading() {
    return (
        <Icon path={mdiLoading}
        title="Load"
        size={1}
        horizontal
        vertical
        rotate={90}
        color="blue"
        spin
      />
    )
}