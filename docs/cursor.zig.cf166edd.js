var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expect = std.testing.expect;"},
{"lineNum":"   20","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"const CursorImpl = u32;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"pub const Cursor = struct {"},
{"lineNum":"   25","line":"    ln: CursorImpl,"},
{"lineNum":"   26","line":"    ch: CursorImpl,"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    pub fn new(ln: CursorImpl, ch: CursorImpl) Cursor {","class":"lineCov","hits":"1","order":"10","possible_hits":"1",},
{"lineNum":"   29","line":"        return Cursor{","class":"lineCov","hits":"1","order":"13","possible_hits":"1",},
{"lineNum":"   30","line":"            .ln = ln,","class":"lineCov","hits":"1","order":"11","possible_hits":"1",},
{"lineNum":"   31","line":"            .ch = ch,","class":"lineCov","hits":"1","order":"12","possible_hits":"1",},
{"lineNum":"   32","line":"        };"},
{"lineNum":"   33","line":"    }"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    pub fn eql(a: Cursor, b: Cursor) bool {","class":"lineCov","hits":"1","order":"709","possible_hits":"1",},
{"lineNum":"   36","line":"        return a.ln == b.ln and a.ch == b.ch;","class":"lineCov","hits":"1","order":"710","possible_hits":"1",},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":"};"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"test \"cursor can be initialized\" {","class":"lineCov","hits":"2","order":"700","possible_hits":"2",},
{"lineNum":"   41","line":"    const ln: CursorImpl = 4;"},
{"lineNum":"   42","line":"    const ch: CursorImpl = 7;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    const c = Cursor.new(ln, ch);","class":"lineCov","hits":"1","order":"701","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    try expectEqual(ln, c.ln);","class":"lineCov","hits":"1","order":"702","possible_hits":"1",},
{"lineNum":"   47","line":"    try expectEqual(ch, c.ch);","class":"lineCov","hits":"1","order":"703","possible_hits":"1",},
{"lineNum":"   48","line":"}"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"test \"cursors can be compared for equality\" {","class":"lineCov","hits":"2","order":"704","possible_hits":"2",},
{"lineNum":"   51","line":"    const a = Cursor.new(2, 4);","class":"lineCov","hits":"1","order":"705","possible_hits":"1",},
{"lineNum":"   52","line":"    const b = Cursor.new(2, 4);","class":"lineCov","hits":"1","order":"706","possible_hits":"1",},
{"lineNum":"   53","line":"    const c = Cursor.new(4, 7);","class":"lineCov","hits":"1","order":"707","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    try expect(a.eql(b));","class":"lineCov","hits":"1","order":"708","possible_hits":"1",},
{"lineNum":"   56","line":"    try expect(!a.eql(c));","class":"lineCov","hits":"1","order":"711","possible_hits":"1",},
{"lineNum":"   57","line":"    try expect(b.eql(a));","class":"lineCov","hits":"1","order":"712","possible_hits":"1",},
{"lineNum":"   58","line":"    try expect(!b.eql(c));","class":"lineCov","hits":"1","order":"713","possible_hits":"1",},
{"lineNum":"   59","line":"    try expect(!c.eql(a));","class":"lineCov","hits":"1","order":"714","possible_hits":"1",},
{"lineNum":"   60","line":"    try expect(!c.eql(b));","class":"lineCov","hits":"1","order":"715","possible_hits":"1",},
{"lineNum":"   61","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 08:55:56", "instrumented" : 20, "covered" : 20,};
var merged_data = [];
