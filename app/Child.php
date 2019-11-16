<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Child
 *
 * @property int $id
 * @property int $ad_id
 * @property string $birthday
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereAdId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereBirthday($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Child whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Child extends Model
{
    use SoftDeletes;
}
