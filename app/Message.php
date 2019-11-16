<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Message
 *
 * @property int $id
 * @property int|null $from_id
 * @property int|null $to_id
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereContent( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereCreatedAt( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereFromId( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereId( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereToId( $value )
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Message whereUpdatedAt( $value )
 * @mixin \Eloquent
 */
class Message extends Model
{
    use SoftDeletes;

    public function from(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_id');
    }


    public function to(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_id');
    }
}
