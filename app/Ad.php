<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use function foo\func;

/**
 * App\Ad
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad query()
 * @mixin \Eloquent
 * @property int $id
 * @property string|null $starts_at
 * @property string|null $ends_at
 * @property float|null $coords_x
 * @property float|null $coords_y
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereCoordsX( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereCoordsY( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereCreatedAt( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereDeletedAt( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereEndsAt( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereId( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereStartsAt( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Ad whereUpdatedAt( $value )
 */
class Ad extends Model
{
    use SoftDeletes;

    public function children(): HasMany
    {
        return $this->hasMany(Child::class);
    }


    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function createChildrenFromArray(array $children)
    {
        \Validator::make($children, [
            'children.*.birthday' => 'date|before:today',
        ])->validate();

        $children = collect($children);
        $children->each(function ($child) {

            $c           = $this->makeChild();
            $c->birthday = \Arr::get($child, 'birthday');
            $c->save();
        });
    }


    private function makeChild(): Child
    {
        return $this->children()->make();
    }

}
