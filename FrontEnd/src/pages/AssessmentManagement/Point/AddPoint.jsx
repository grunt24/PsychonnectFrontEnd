import { createPoints } from '../../../api/pointService';
import PointForm from './PointForm';
import { useMutation } from '@tanstack/react-query';

const AddPoint = () => {
    const createPointMutation = useMutation({
        mutationFn: createPoints
    });

    const handleAddPoint = async (pointData) => {
        await createPointMutation.mutate({
            ...pointData,
        });
    }

    return (
        <div>
            <PointForm onSubmit={handleAddPoint} />
        </div>
    );
}

export default AddPoint;
