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
{"lineNum":"   19","line":"const node = @import(\"node.zig\");"},
{"lineNum":"   20","line":"const Node = node.Node;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub const Backend = struct {"},
{"lineNum":"   23","line":"    pub const Error = anyerror;"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    pub const Callback = fn (be: *Backend) Error!void;"},
{"lineNum":"   26","line":"    pub const NodeCallback = fn (be: *Backend, nd: Node) Error!void;"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    pub const Callbacks = struct {"},
{"lineNum":"   29","line":"        prolog: Callback,"},
{"lineNum":"   30","line":"        epilog: Callback,"},
{"lineNum":"   31","line":"        processNode: NodeCallback,"},
{"lineNum":"   32","line":"    };"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    callbacks: Callbacks,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    pub fn prolog(self: *Backend) Error!void {","class":"lineCov","hits":"2","order":"85","possible_hits":"2",},
{"lineNum":"   37","line":"        try self.callbacks.prolog(self);","class":"lineCov","hits":"1","order":"86","possible_hits":"1",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn epilog(self: *Backend) Error!void {","class":"lineCov","hits":"2","order":"133","possible_hits":"2",},
{"lineNum":"   41","line":"        try self.callbacks.epilog(self);","class":"lineCov","hits":"1","order":"134","possible_hits":"1",},
{"lineNum":"   42","line":"    }"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    pub fn processNode(self: *Backend, nd: Node) Error!void {","class":"lineCov","hits":"2","order":"4317","possible_hits":"2",},
{"lineNum":"   45","line":"        try self.callbacks.processNode(self, nd);","class":"lineCov","hits":"1","order":"4318","possible_hits":"1",},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-13 18:02:08", "instrumented" : 6, "covered" : 6,};
var merged_data = [];
