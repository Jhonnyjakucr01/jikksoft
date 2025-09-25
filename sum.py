<?php

function Sum(array $nums, int $target): array
{
    $map = []; 
    foreach ($nums as $i => $num) {
        $complement = $target - $num;
        if (isset($map[$complement])) {
            return [$map[$complement], $i];
        }
        $map[$num] = $i;
    }
    return [];
}

$resultado = twoSum([20, 7, 11, 15,40,4], 51);
print_r($resultado); // Debería mostrar [2, 4]
